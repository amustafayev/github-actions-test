

module.exports = async ({github, context, core}) => {

    const MAIN_BRANCH = "main"
    const FILE_LIMIT_EXCEED = '❌There is so many files to create PR!❌'
    const TITLE_FORMAT_ERROR = '❌Title is not in a correct format!❌'
    const PR_BODY_EMPTY_ERROR = '❌PR Body can not be empty!❌'
    const MAX_CHANGED_FILES = 40
    const MASTER_TITLE_REGEX = /^RELEASE$/ 
    const TITLE_REGEX = /^(^[A-Z]+)-(\d+):([ A-z1-9\.\,]+)$/

    var regex = new RegExp(TITLE_REGEX);

    if(context.payload.pull_request.base.ref == MAIN_BRANCH){
        regex = new RegExp(MASTER_TITLE_REGEX);
    }

    if(context.payload.pull_request.changed_files > MAX_CHANGED_FILES){
        await github.rest.issues.createComment({
                issue_number: context.issue.number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: FILE_LIMIT_EXCEED
        })
        
        core.setFailed('Workflow Failed! cause: '+ FILE_LIMIT_EXCEED)
    }

    if(regex.test(context.payload.pull_request.title)==false){
        await github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: TITLE_FORMAT_ERROR
        })
    
        core.setFailed('Workflow Failed! cause: ' + TITLE_FORMAT_ERROR) 
    }

    if (context.payload.pull_request.body == null){
        await github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: PR_BODY_EMPTY_ERROR
        })
        core.setFailed('Workflow Failed! cause: ' + PR_BODY_EMPTY_ERROR) 
    }
}