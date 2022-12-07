const { registerStudent, registerCompany, login } = require("../../../controllers/auth.controller");
const { Admin, Student, Company } = require("../../../models");
const { connect, clear, close } = require("../../db");
const { mockRequest, mockResponse } = require("../../interceptor");

beforeAll(async () => connect());
beforeEach(async () => clear());
afterAll(async () => close());

describe('registerStudent', () => {

    const payload = {
        _id: '6378a804b5bbfec8ae71acb3',
        firstName: 'Test',
        lastName: 'Name',
        email: 'test@mail.com',
        password: '123456',
        birthdate: new Date(),
        experience: 2,
        tags: ['sample', 'tag'],
    };

    it('should respond 201 on success with created object', async () => {

        // arrange
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await registerStudent(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email,
                birthdate: payload.birthdate,
                experience: payload.experience,
                tags: payload.tags,
                name: `${payload.firstName} ${payload.lastName}`,
                role: 'student'
            })
        );
    })

    it('should respond 500 on failure with error message', async () => {

        // arrange
        const spyStudentCreate = jest.spyOn(Student, 'create').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await registerStudent(req, res);

        // assert
        expect(spyStudentCreate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});

describe('registerCompany', () => {

    const payload = {
        _id: '6378a804b5bbfec8ae71acb3',
        name: 'Company',
        email: 'company@mail.com',
        password: '123456',
        description: 'Test Description',
        locations: ['sample', 'location']
    };

    it('should respond 201 on success with created object', async () => {

        // arrange
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await registerCompany(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                name: payload.name,
                email: payload.email,
                description: payload.description,
                locations: payload.locations,
                role: 'company'
            })
        );
    })

    it('should respond 500 on failure with error message', async () => {

        // arrange
        const spyCompanyCreate = jest.spyOn(Company, 'create').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await registerCompany(req, res);

        // assert
        expect(spyCompanyCreate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});

describe('login', () => {

    const payload = {
        _id: '6378a804b5bbfec8ae71acb3',
        name: 'Admin',
        email: 'admin@mail.com',
        password: '123456',
        role: 'admin'
    };

    it('should respond 200 on success with accessToken and refreshToken', async () => {

        // arrange
        const spyAdminAuthenticate = jest.spyOn(Admin, 'authenticate').mockResolvedValue(new Admin(payload));
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await login(req, res);

        // assert
        expect(spyAdminAuthenticate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                accessToken: expect.any(String),
                refreshToken: expect.any(String)
            })
        );
    })

    it('should respond 401 on failure with error message', async () => {

        // arrange
        const spyAdminAuthenticate = jest.spyOn(Admin, 'authenticate').mockRejectedValue(false);
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await login(req, res);

        // assert
        expect(spyAdminAuthenticate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});
