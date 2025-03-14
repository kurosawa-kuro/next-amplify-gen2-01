{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::amplify-nextamplifygen201-micropostsbucketf99ebccf-yfr9n0s7jjgl/public/*"
        },
        {
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::amplify-nextamplifygen201-micropostsbucketf99ebccf-yfr9n0s7jjgl",
                "arn:aws:s3:::amplify-nextamplifygen201-micropostsbucketf99ebccf-yfr9n0s7jjgl/*"
            ],
            "Condition": {
                "Bool": {
                    "aws:SecureTransport": "false"
                }
            }
        },
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::677276118659:role/amplify-nextamplifygen201-CustomS3AutoDeleteObjects-pW5v4L1NJluD"
            },
            "Action": [
                "s3:PutBucketPolicy",
                "s3:GetBucket*",
                "s3:List*",
                "s3:DeleteObject*"
            ],
            "Resource": [
                "arn:aws:s3:::amplify-nextamplifygen201-micropostsbucketf99ebccf-yfr9n0s7jjgl",
                "arn:aws:s3:::amplify-nextamplifygen201-micropostsbucketf99ebccf-yfr9n0s7jjgl/*"
            ]
        }
    ]
}

[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD",
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "x-amz-server-side-encryption",
            "x-amz-request-id",
            "x-amz-id-2",
            "ETag"
        ],
        "MaxAgeSeconds": 3000
    }
]