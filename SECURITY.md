# Security reporting

For a security or privacy issue affecting SiddySounds, email
[mail@siddysounds.com](mailto:mail@siddysounds.com) with the subject
“Website security report”. Include the affected URL, a description, and
minimal steps to reproduce. Do not include real visitor data, credentials,
or destructive proof-of-concept activity in a public issue.

The deployed website is a static GitHub Pages project. Only the current
default branch is maintained. There is no guaranteed response time or paid
bug-bounty program.

Browser-side Firebase configuration identifies the project; access must be
restricted by Firestore rules. API/service access and provider-side data
retention must be reviewed in the relevant service consoles. Never put
private service-account credentials into this public repository.
