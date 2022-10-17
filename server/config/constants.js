module.exports = {
    "API": {
        "CHANNEL": "/action/channel/v1/*",
        "FRAMEWORK": "/api/framework/v1/read/*",
        "COMPOSITE": "/action/composite/v3/search",
        "COMPOSITE_API": "/api/composite/v1/search",
        "QUESTION_LIST": "/api/question/v1/list",
        "USERS": "/action/users",
        "TELEMMETRY": "/action/data/v3/telemetry",
        "OBJECT_CATEGORY_DEFINITION": "/action/object/category/definition/v1/*",
        "PREFIX": {
            "ACTION": "/action",
            "ASSETS": "/assets",
            "API": "/api"
        },
        "LEARNER": {
            "FRAMEWORK": "/learner/framework/v1/read/*",
            "QUESTIONSET_HIERARCHY": "/learner/questionset/v1/hierarchy/*"
        },
        "LATEX": {
            "CONVERT": "/latex/convert"
        },
        "QUESTIONSET": {
            "CREATE": "/action/questionset/v1/create",
            "READ": "/action/questionset/v1/read/*",
            "HIERARCHY_READ": "/action/questionset/v1/hierarchy/*",
            "REVIEW": "/action/questionset/v1/review/*",
            "REJECT": "/action/questionset/v1/reject/*",
            "PUBLISH": "/action/questionset/v1/publish/*",
            "RETIRE": "/action/questionset/v1/retire/*"
        },
        "ASSET": {
            "CREATE": "/action/asset/v1/create",
            "CONTENT_UPLOAD_URL": "/action/content/v3/upload/url/*",
            "ASSET_UPLOAD": "/action/asset/v1/upload/*"
        }
    }
}
