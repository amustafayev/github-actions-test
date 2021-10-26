module.exports = async ({github, context, core}) => {

    const MAIN_BRANCH = "main"
    const TITLE_FORMAT_ERROR = '❌Title is not in a correct format! Ex: TEST-001: Some description.'
    const MASTER_TITLE_FORMAT_ERROR = '❌Title is not in a correct format! Should contain \'release\''
    const PR_BODY_EMPTY_ERROR = '❌PR Body can not be empty!'
    const MASTER_TITLE = "release"
    const TITLE_REGEX = /^(^[A-Z]+)-(\d+):([ A-z1-9\.\,]+)$/

    var regex = new RegExp(TITLE_REGEX);

    if(context.payload.pull_request.base.ref === MAIN_BRANCH &&
                !context.payload.pull_request.title.toLowerCase().includes(MASTER_TITLE)){
        await createComment(MASTER_TITLE_FORMAT_ERROR)

        core.setFailed('Workflow Failed! cause: ' + MASTER_TITLE_FORMAT_ERROR)
    }

    if(regex.test(context.payload.pull_request.title)===false){
        await createComment(TITLE_FORMAT_ERROR)

        core.setFailed('Workflow Failed! cause: ' + TITLE_FORMAT_ERROR)
    }

    if (context.payload.pull_request.body == null){
        await createComment(PR_BODY_EMPTY_ERROR)

        core.setFailed('Workflow Failed! cause: ' + PR_BODY_EMPTY_ERROR)
    }

    async function createComment(body) {
        await github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: body
        })
    }
}