exports.companyListConvertor = (companys) => {
    let companyResult = [];
    companys.forEach(company => {
        companyResult.push({
            name: company.name,
            userId: company.userId,
            emailId: company.emailId,
            role: company.role,
            description: company.description,
            career: company.career,
            vacancy: company.vacancy,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt
        })
    })
    return companyResult;
}