/**
 * Created by rohit on 2018-08-22.
 */
s3.upload(uploadParams, options, function (err, data) {
    console.log(`S3 upload functionality processed for  ${fileName}:: ${moment().format("MM ddd, YYYY hh:mm:ss a")}`);
    isFilupoading = false;

    if (err) {
        console.log({
            error: `Error while uploading ${fileName} on S3`,
            err: err
        });
        inCompletedItems.push(fileName);
        console.log(`1 : In-Complete Items: ${inCompletedItems || 0}`)
        fs.appendFileSync(outputLog, "\r\nError", err + "\r\n");
    }
    if (data) {
        fs.appendFileSync(outputLog, "\r\nUpload Success: " + data.Location + "\r\n");
        var newFileName = data.Location.split("/").pop();
        //console.log (data.Location);
        var ext = data.Location.split(".").pop();
        //console.log (ext);

        var recordToDelete;
        deleteloop:
            for (var j = 1; j < maxNum; j++) {
                var thisTitle = jsonData[j][6];
                thisTitle = thisTitle.replace(/—/g, '-');
                thisTitle = thisTitle.replace(/"/g, "'");
                thisTitle = thisTitle.replace(/\+/g, " ");
                thisTitle = decodeURI(thisTitle);

                newFileName = newFileName.replace(/—/g, '-');
                newFileName = newFileName.replace(/"/g, "'");
                newFileName = newFileName.replace(/\+/g, " ");

                newFileName = decodeURI(newFileName);

                //console.log (newFileName + " " + thisTitle + " " + (newFileName === thisTitle));

                if (thisTitle === newFileName) {
                    //console.log ("found");
                    recordToDelete = jsonData[j];
                    //console.log(recordToDelete + " " + newFileName + " " + recordToDelete[2]);
                    var idFileName = recordToDelete[2];
                    idFileName = "uploads/" + param + "/" + idFileName + "." + ext;
                    //console.log ("\r\ntrying to delete: " + idFileName);
                    fs.appendFileSync(outputLog, "\r\nTrying to delete: " + idFileName);
                    if (fs.existsSync(idFileName)) {
                        fs.unlinkSync(idFileName);
                        fs.appendFileSync(outputLog, "\r\nDeleted " + idFileName);
                        completedItems.push(idFileName);
                        //console.log (completedItems.length + " " + maxNum);
                        if ((completedItems.length + inCompletedItems.length) + 1 >= maxNum) {
                            //console.log("\r\nall done with " + param + "/" + thisCSV);

                            if (isFilupoading === true) {
                                var refreshId = setInterval(function () {
                                    repeate_count = repeate_count + 1;
                                    if (repeate_count > 100 || isFilupoading === false) {
                                        console.log(`All uploads are complete:: ${moment().format("MM ddd, YYYY hh:mm:ss a")}`);
                                        clearInterval(refreshId);
                                    } else {
                                        console.log(`Still One upload in progress:: ${moment().format("MM ddd, YYYY hh:mm:ss a")}`);
                                    }
                                }, 5000);
                            } else {
                                console.log(`Uploading File : ${fileName}:: ${moment().format("MM ddd, YYYY hh:mm:ss a")}`);
                            }

                            if (fs.existsSync("uploads/" + param + "/" + thisCSV)) {
                                fs.unlinkSync("uploads/" + param + "/" + thisCSV);
                                fs.appendFileSync(outputLog, "\r\n\r\nDeleted " + thisCSV + "\r\nALL DONE WITH THIS MANIFEST\r\n\r\n");
                            }
                            cb({status: true});
                        } else {
                            console.log(`All files are not uploaded yet`);
                        }
                    }
                    break deleteloop;
                }
            }
        cb({status: true});
    }
    console.log(`2: In-Complete Items: ${inCompletedItems || 0}`)
}).on('httpUploadProgress', (progress) => {
    console.log(`${Number(((parseInt(progress.loaded) * 100) / parseInt(progress.total)).toFixed(1))} % - Completed For ${progress.key}`);
});