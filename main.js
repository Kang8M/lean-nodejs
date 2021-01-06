var nodemailer = require('nodemailer');

const option = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    type: "OAUTH2",
    user: 'hung.luu@ntq-solution.com.vn',
    clientId: '535259468104-at9f0ruf26rdbim9lut869kkma9skp32.apps.googleusercontent.com',
    clientSecret: 'q9eaoW5waa-bShRif0dQdzF_',
    refreshToken: '1//04vKcMV7vhhjwCgYIARAAGAQSNwF-L9IrKRheqZz3L80OOwQK2EPo3VrlhNjJ9YGG2XebJAjANSffEjwBeTxNBjle3-r4mAajDTg',
    accessToken: 'ya29.a0AfH6SMAnme-5b09qbb0ut7c3dl9_RVS_mxG2XB2AvzgTgR53Hrlm2a2frXHpBI5UMSsf__KAylMaaL1l73Eh67FtjiyKD7dhm9ia0s6lK8c61RbCNJZj5uE8db_v2vu4xFND01c-FQv_WOPGuUlhEz4uZXRqsltI2-A5SkwiDyo',
    expires: 3599
  }
}

var transpoter = nodemailer.createTransport(option)

transpoter.verify((err, sus) => {
  if (err)
    console.log(err)
  else
    console.log('connected!')
})