

module.exports = ({github, context,core}) => {
    

    cconsole.log(context)
    
    const MAIN_BRANCH = "main"
    if(context.payload.pull_request.changed_files > 40){
        await github.rest.issues.createComment({
                issue_number: context.issue.number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: 'There is so many files to create pr'
        })
        
        core.setFailed('Workflow Failed!')
    }

    var regex = new RegExp(/^(^[A-Z]+)-(\d+):([ A-z1-9\.\,]+)$/);

    if(context.payload.pull_request.base.ref == MAIN_BRANCH){
        regex = new RegExp(/^RELEASE$/);
    }

    if(regex.test(context.payload.pull_request.title)==false){
        await github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: 'Title is not in a correct format'
        })
    
        core.setFailed('Workflow Failed!') 
    }

    if (context.payload.pull_request.body == null){
      await github.rest.issues.createComment({
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: 'PR Body can not be empty!'
        })
        core.setFailed('Workflow Failed!') 
    }
}