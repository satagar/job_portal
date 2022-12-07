const { default: mongoose } = require("mongoose");
const { index, create, read, update, destroy } = require("../../../controllers/student.controller");
const { Student } = require("../../../models");
const { connect, clear, close } = require("../../db");
const { mockRequest, mockResponse } = require("../../interceptor");

beforeAll(async () => connect());
beforeEach(async () => clear());
afterAll(async () => close());

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

describe('index', () => {
    it('should respond 200 on success with empty array', async () => {
        // arrange
        const req = mockRequest();
        const res = mockResponse();
        
        // act
        await index(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([])
        );
    })

    it('should respond 200 on success with array of objects', async () => {
        // arrange
        const spyStudentFind = jest.spyOn(Student, 'find').mockResolvedValue([
            new Student(payload)
        ]);
        const req = mockRequest();
        const res = mockResponse();
        
        // act
        await index(req, res);

        // assert
        expect(spyStudentFind).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: mongoose.Types.ObjectId(payload._id),
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email,
                    birthdate: payload.birthdate,
                    experience: payload.experience,
                    tags: payload.tags,
                    name: `${payload.firstName} ${payload.lastName}`,
                    role: 'student'
                })
            ])
        );
    })

    it('should respond 500 on failure with error message', async () => {
        // arrange
        const spyStudentFind = jest.spyOn(Student, 'find').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        
        // act
        await index(req, res);

        // assert
        expect(spyStudentFind).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});

describe('create', () => {
    it('should respond 201 on success with created object', async () => {

        // arrange
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await create(req, res);

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
        await create(req, res);

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

describe('read', () => {
    it('should respond 200 on success with requested object', async () => {

        // arrange
        const spyStudentFindById = jest.spyOn(Student, 'findById').mockResolvedValue(new Student(payload));
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;

        // act
        await read(req, res);

        // assert
        expect(spyStudentFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                _id: mongoose.Types.ObjectId(payload._id),
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

    it('should respond 404 on data null with error message', async () => {

        // arrange
        const spyStudentFindById = jest.spyOn(Student, 'findById').mockResolvedValue(null);
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;

        // act
        await read(req, res);

        // assert
        expect(spyStudentFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })

    it('should respond 404 on invalid id with error message', async () => {

        // arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = 1;

        // act
        await read(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })

    it('should respond 500 on failure with error message', async () => {

        // arrange
        const spyStudentFindById = jest.spyOn(Student, 'findById').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;

        // act
        await read(req, res);

        // assert
        expect(spyStudentFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});

describe('update', () => {
    it('should respond 200 on success with requested object', async () => {

        // arrange
        const spyStudentFindById = jest.spyOn(Student, 'findById').mockResolvedValue(new Student(payload));
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;
        req.body = payload;

        // act
        await update(req, res);

        // assert
        expect(spyStudentFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                _id: mongoose.Types.ObjectId(payload._id),
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

    it('should respond 404 on data null with error message', async () => {

        // arrange
        const spyStudentFindById = jest.spyOn(Student, 'findById').mockResolvedValue(null);
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;

        // act
        await update(req, res);

        // assert
        expect(spyStudentFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })

    it('should respond 404 on invalid id with error message', async () => {

        // arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = 1;

        // act
        await update(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })

    it('should respond 500 on failure with error message', async () => {

        // arrange
        const spyStudentFindById = jest.spyOn(Student, 'findById').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;

        // act
        await update(req, res);

        // assert
        expect(spyStudentFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});