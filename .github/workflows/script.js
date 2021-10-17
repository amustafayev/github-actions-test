

module.exports = ({github, context,core}) => {
    

        if(context.payload.pull_request.changed_files > 40){
            await github.rest.issues.createComment({
                    issue_number: context.issue.number,
                    owner: context.repo.owner,
                    repo: context.repo.repo,
                    body: 'There is not enough file to create pr'
            })
            
            core.setFailed('Workflow Failed!')
        }

        const regex = new RegExp(/^(^[A-Z]+)-(\d+):([ A-z1-9\.\,]+)$/);

        if(regex.test(context.payload.pull_request.title)==false){
            await github.rest.issues.createComment({
                issue_number: context.issue.number,
                owner: context.repo.owner,
                repo: context.repo.repo,
                body: 'Title is not in a correct format'
            })
        
            core.setFailed('Workflow Failed!')
        }
}