/**
 * Created by rohit on 2018-03-30.
 */

const fs = require('fs'),
    async = require('async'),
    util = require('util'),
    validator = require('validator'),
    DB = require('./db-service');
//Services
const s3OperationsService = require('../services/s3Operations');
const config = require('config');
const mkdirp = require('mkdirp');

exports.createDirectory = (folderName, localRootPath) => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(localRootPath)) {
            const dirName = mkdirp.sync(localRootPath);
            if (localRootPath.indexOf(dirName) >= 0)
                console.log('Created tmp directory : ', localRootPath);
            else
                console.error(`Error while creating directory`);
        }
        const itemFolder = localRootPath + '/' + folderName;
        if (fs.existsSync(itemFolder)) {
            console.log('Directory already exists : ', itemFolder);
            resolve(true);
        }
        if (!fs.existsSync(itemFolder)) {
            const foldaName = mkdirp.sync(itemFolder);
            if (itemFolder.indexOf(foldaName) >= 0) {
                console.log('Created directory : ', itemFolder);
            }
            else {
                console.error(`Error while creating directory`);
            }
            resolve(true);
        } else {
            resolve(true);
        }
    });
}

exports.getProductObjectLists = (productName, cb) => {
    async.waterfall([
        // async.apply((callback) => {
        //     DB.executeQuery('SELECT name, tcm_type, folder_ETag, img_ETag, created_at FROM products WHERE tcm_id = ?', [productID], (err, rows) => {
        //         callback(err, rows)
        //     })
        // }),
        async.apply((callback) => {
            s3OperationsService.listObjects(productName, function (err, fileData) {
                callback(err, fileData)
            });
        }),
        async.apply((fileData, callback) => {
            if (fileData.content.Contents.length > 0) {
                s3OperationsService.getPublicUrlArray(fileData.content.Contents, (err, result) => {
                    if (err) {
                        console.log('Error');
                        callback(err, null);
                    } else {
                        fileData.content.Contents = result
                        callback(null, fileData)
                    }
                });
            }
            else {
                callback(null, fileData);
            }
        }),
        async.apply((fileData, callback) => {
            s3OperationsService.getMetadataOfFiles(fileData, (err, result) => {
                if (!!err) {
                    console.log("Error");
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        })
    ], (err, result) => {
        if (err) {
            cb(err, result)
        } else {
            cb(null, result)
        }
    });
};

exports.updateAutoUploaderCronState = (state, error, productID) => {
    console.log(`Updating auto_uploader_list_cron state for product : ${productID}`);
    DB.executeQuery('SELECT * FROM auto_uploader_error WHERE product_id = ?', [productID], (err, rows) => {
        if (!!err) {
            console.log(`Error while updating auto_uploader_list_cron Product ${productID}`);
            return;
        }
        if (rows.length > 0) {
            console.log(`Updating auto_uploader_list_cron state for product : ${productID}`);
            DB.executeQuery('UPDATE auto_uploader_list_cron SET state = ?, msg= ? WHERE product_id = ?;', [3, error || null, productID], (err, rows) => {
                if (!!err) {
                    console.log(`Error while updating auto_uploader_list_cron Product ${productID}`);
                    return;
                }
                console.log(`auto_uploader_list_cron state updated Product : ${productID}`);
            });
        } else {
            console.log(`Updating auto_uploader_list_cron state for product : ${productID}`);
            DB.executeQuery('UPDATE auto_uploader_list_cron SET state = ?, msg= ? WHERE product_id = ?;', [state, error || null, productID], (err, rows) => {
                if (!!err) {
                    console.log(`Error while updating auto_uploader_list_cron Product ${productID}`);
                    return;
                }
                console.log(`auto_uploader_list_cron state updated Product : ${productID}`);
            });
        }
        console.log(`auto_uploader_list_cron state updated Product : ${productID}`);
    });
}
/*

 */


exports.updateAutoUploaderCronStateToRetry = (productID) => {
    console.log(`Updating auto_uploader_list_cron retry state for product : ${productID}`);
    DB.executeQuery('CALL updateAutoUploaderCronStateToRetry(?)', [productID], (err, rows) => {
        if (!!err) {
            console.log(`Error while updating updateAutoUploaderCronStateToRetry ${productID}`);
            return;
        }
        console.log(`auto_uploader_list_cron retry state updated Product : ${productID}`);
    });
}


exports.autoUploaderMetadata = (val) => {
    return new Promise((resolve, reject) => {
        "use strict";
        DB.executeQuery('CALL autoUploaderMetadataSp(?,?,?,?,?) ', [val.productID, val.uuid, val.displayName, val.ext, val.s3Key], (err, rows) => {
            if (!!err) {
                console.log('Error while updating auto_uploader_metadata : ', val.productID);
                reject({
                    error: 'Error while updating auto_uploader_metadata : ' + val.productID,
                    err: err
                });
            }
            console.log(`Inserted metadata-id in DB for product : ${val.productID} : File : ${val.displayName}`);
            resolve(true);
        });
    });
}

exports.productUploadFlags = (internalTCMId, progress, cb) => {
    console.log(`Updating productUploadFlags for product : ${internalTCMId}`);
    DB.executeQuery('SELECT IFNULL(count(internal_tcm_id),0) AS count FROM product_upload_flags WHERE internal_tcm_id = ?', [internalTCMId], (err, rows) => {
        if (!!err) {
            console.log('Error while getting existing product id from product_upload_flags : ', internalTCMId);
            cb('Error', false);
        }
        if (!rows[0].count) {
            DB.executeQuery('INSERT INTO product_upload_flags (internal_tcm_id, progress) values(?,?)', [internalTCMId, progress], (err, rows) => {
                if (!!err) {
                    console.log('Error while updating product_upload_flags : ', internalTCMId);
                    cb('Error', false);
                    return
                }
                console.log('product_upload_flags state Created : ', internalTCMId);
                cb(null, true);
            });
        } else {
            DB.executeQuery('UPDATE product_upload_flags SET progress=? WHERE internal_tcm_id=?', [progress, internalTCMId], (err, rows) => {
                if (!!err) {
                    console.log('Error while updating product_upload_flags. ', internalTCMId);
                    cb('Error', false);
                    return;
                }
                console.log('product_upload_flags state updated : ', internalTCMId);
                cb(null, true);
            });
        }
    });
}

exports.putProductUploadFlags = (internalTCMId, progress) => {
    console.log(`Updating putProductUploadFlags for product : ${internalTCMId}`);
    DB.executeQuery('UPDATE product_upload_flags SET progress=? WHERE internal_tcm_id=?', [progress, internalTCMId], (err, rows) => {
        if (!!err) {
            console.log('Error while updating product_upload_flags. ', internalTCMId);
            return;
        }
        console.log('product_upload_flags state updated : ', internalTCMId);
    });
}

exports.autoUploaderError = (productID, autoUploaderListFID, itemID, itemTitle, msg) => {
    console.log(`Inserting autoUploaderError for product : ${productID}`);
    DB.executeQuery('INSERT INTO auto_uploader_error (product_id, auto_uploader_list_cron_fid, item_id, item_title, msg) VALUES (?,?,?,?,?)', [productID, autoUploaderListFID, itemID, itemTitle, msg], (err, rows) => {
        if (!!err) {
            console.log('Error while Inserting autoUploaderError. ', productID);
            return;
        }
        console.log('autoUploaderError inserted : ', productID);
    });
}

exports.getProductDownloadState = (internalTCMId, cb) => {
    console.log(`getProductDownloadState for product : ${internalTCMId}`);
    DB.executeQuery('SELECT * FROM product_download_flags WHERE internal_tcm_id =?', [internalTCMId], (err, rows) => {
        if (err) {
            console.log('Error while updating product_upload_flags.');
            cb('Error', false);
        } else {
            console.log('product_upload_flags state updated');
            if (rows) {
                if (rows.length > 0) {
                    if (rows[0].progress) {
                        cb(`Downloading is already in progress for this product ${internalTCMId}`, false);
                    } else {
                        console.log(`Downloading is not in progress, Files can be uploaded , Product : ${internalTCMId}`);
                        cb(null, true);
                    }
                } else {
                    console.log(`Downloading is not in progress, Files can be uploaded, Product : ${internalTCMId}`);
                    cb(null, true);
                }
            } else {
                console.log(`Downloading is not in progress, Files can be uploaded, Product : ${internalTCMId}`);
                cb(null, true);
            }
        }
    });
}


exports.deleteDirective = async (path) => {
    let isSuccess = await deleteFolderRecursive(path);
    return new Promise((resolve, reject) => {
        if (isSuccess) {
            resolve(true);
        }
    });
}

deleteFolderRecursive = (path) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
            resolve(true);
        } else {
            resolve(true);
        }
    });
};
