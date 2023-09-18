
const admin = require('../adminController');
const { app } = require('../../app');
const auth = require('../authController');
const supertest = require('supertest');
const userModel = require('../../models/user');
// const { sendSuccessMessage, sendErrorMessage, } = require('../../middlewares/responseHandler');
const { ObjectId } = require('mongodb');

let adminId = null;
let token = null;
let refreshToken = null;

beforeAll(async () => {
    //generate token for testing 
    token = await auth.createToken({ role: 'ADMIN', id: '123' }, process.env.ACCESS_SECRET_KEY, process.env.ACCESS_TOKEN_EXPIRY_TIME);
    //generate refresh token 
    refreshToken = await auth.createToken({ role: 'ADMIN', id: '123' }, process.env.REFRESH_SECRET_KEY, process.env.REFRESH_TOKEN_EXPIRY_TIME);
});


describe('#### Controllers Testing ####', () => {

    describe('### ### ### Admin Controller Testing ### ### ### ', () => {


        // describe('defineRole function testing', () => {

        //     test('defineRole function will return role based on id passed on it', async () => {
        //         const expectedResult = 'SUPADMIN';
        //         const role = admin.defineRole(0);
        //         expect(role).toEqual(expectedResult);
        //     });

        //     test('defineRole function will return null if you pass any other roleId except (0,1,2)', async () => {
        //         const expectedResult = null;
        //         const role = admin.defineRole(3);
        //         expect(role).toEqual(expectedResult);
        //     });

        //     test('defineRole function return "Give roleId in numeric" if passes roleId in string', async () => {
        //         const expectedResult = 'Give roleId in numeric';
        //         const role = admin.defineRole('3');
        //         expect(role).toEqual(expectedResult);
        //     });
        //     test('defineRole function return null if passes roleId in empty', async () => {
        //         const expectedResult = null;
        //         const role = admin.defineRole(' ');
        //         expect(role).toEqual(expectedResult);
        //     });
        // });
        describe('addUser function testing', () => {
            const request = {
                role: 'ADMIN',
                firstName: 'Nitesh',
                lastName: 'Thapliyal',
                createdBy: 'SUPADMIN',
                email: 'nitesh2980@gmail.com',
                password: 'mohiT@1',
                mobile: '9870860293',
                city: 'Kotdwara',
                state: 'Uttarakhand',
                addressLine1: 'Jivanandpur,BEL Road, Kotdwara',
                addressLine2: 'A.B Hostel Vidya vihar, knowledge park 2',
                pincode: '246149',
                highSchoolName: 'R.C.D Public School',
                highSchoolPercentage: 95,
                intermediateSchoolName: 'R.C.D Public School',
                intermediateSchoolPercentage: 83,
                collegeName: 'GL Bajaj',
                collegePercentage: 78
            };


            //here i will  call controller 
            test('should return user details if passes valid body ', async () => {
                const response = await supertest(app)
                    .post('/admin/adduser')
                    .set('token', `Bearer ${token}`)
                    .send(request);
                expect(response.statusCode).toBe(200);
                expect(typeof response.body).toBe('object');
                expect(response.body.data.data.email).toBe(request.email);
                adminId = response.body.data.data._id;
                expect(new ObjectId(response.body.data.data._id)).toBeTruthy();
            });

            test('should return status code 400 if you pass empty request body', async () => {
                const request = {};
                const response = await supertest(app)
                    .post('/admin/adduser')
                    .set('token', `Bearer ${token}`)
                    .send(request);
                expect(response.statusCode).toBe(400);
            });


            test('should return status code 400 if you will not pass token in headers', async () => {
                const response = await supertest(app)
                    .post('/admin/addUser')
                    .send(request);
                expect(response.statusCode).toBe(400);
                expect(response.body[0].message).toBe('must have required property \'token\'');
            });
        });

        describe('getAdminDetail function testing', () => {

            test('should return admin detail if passes valid Id', async () => {
                const response = await supertest(app)
                    .get(`/admin/getAdminDetail/${adminId}`)
                    .set('token', `Bearer ${token}`);
                expect(response.statusCode).toBe(200);
                expect(response.body.message).toBe('Data get successfully');

            });

            test('should return status code 401 if user id is invalid', async () => {
                const response = await supertest(app)
                    .get('/admin/getAdminDetail/645b406d0ee54fc34129061b')
                    .set('token', `Bearer ${token}`);
                expect(response.statusCode).toBe(401);
                expect(response.body.message).toBe('Invalid Id!!!');
            });

            test('should return status code 400 or bad request ', async () => {
                const response = await supertest(app)
                    .get('/admin/getAdminDetail/')
                    .set('token', `Bearer ${token}`);
                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBe('Requested URL /getAdminDetail/ not found !!');
            });
        });


    });


    describe('### ### ### Auth Controller ### ### ###', () => {

        describe('autoLogin Function testing', () => {

            test('should return status code 200 ', async () => {
                const response = await supertest(app)
                    .get('/auth/autoLogin')
                    .set('token', `Bearer ${token}`);

                expect(response.statusCode).toBe(200);
                expect(response.body.message).toBe('Logged in by token');
            });


            test('should return 400 if no token is passed', async () => {
                const response = await supertest(app)
                    .get('/auth/autoLogin');
                expect(response.statusCode).toBe(400);
                expect(response.body[0].message).toBe('must have required property \'token\'');
            });

            test('should return 401 if provided expired token', async () => {
                const response = await supertest(app)
                    .get('/auth/autoLogin')
                    .set('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlSWQiOjEsImlkIjoiNjQ2MDcxY2M4ODdlNWYwZWFkYWFhMDc2IiwiaWF0IjoxNjg0MDQ0Mjc4LCJleHAiOjE2ODQwNDU0Nzh9.m9oXzoDIvgiOn10wQGn_a_IFTUN9H9SsUcMLbOdITB0');
                expect(response.statusCode).toBe(401);
                expect(response.body.message).toBe('jwt expired');

            });

        });

        describe('createAccessToken function testting', () => {

            test('should return accesstoken with status code 200', async () => {
                const response = await supertest(app)
                    .get('/auth/createAccessToken')
                    .set('token', `Bearer ${refreshToken}`);
                expect(response.statusCode).toBe(200);
                expect(response.body.message).toBe('Access Token Generated');
            });

            test('should return status code 400  if you don\'t pass Refresh Token ', async () => {
                const response = await supertest(app)
                    .get('/auth/createAccessToken');
                expect(response.statusCode).toBe(400);
                expect(response.body[0].message).toBe('must have required property \'token\'');
            });

            test('should return status code 500 if provided expired token ', async () => {
                const response = await supertest(app)
                    .get('/auth/createAccessToken')
                    .set('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlSWQiOjEsImlkIjoiNjQ2MDcxY2M4ODdlNWYwZWFkYWFhMDc2IiwiaWF0IjoxNjg0MDQ0Mjc4LCJleHAiOjE2ODQwNDU0Nzh9.m9oXzoDIvgiOn10wQGn_a_IFTUN9H9SsUcMLbOdITB0');
                expect(response.statusCode).toBe(500);
                expect(response.body.message).toBe('invalid signature');
            });
        });


        describe('userSignIn function testing', () => {
            const req = {
                email: 'nitesh2980@gmail.com',
                password: 'mohiT@1'
            };

            test('should return status code 200 and access token when provided valid email and password', async () => {
                const response = await supertest(app)
                    .post('/auth/logIn')
                    .send(req);
                expect(response.statusCode).toBe(200);
                expect(response.body.message).toBe('logged in successfully');
                expect(typeof response.body).toBe('object');
            });

            test('should return status code 400 and when provided null body', async () => {
                const response = await supertest(app)
                    .post('/auth/logIn')
                    .send({});
                expect(response.statusCode).toBe(400);
                expect(response.body[0].message).toBe('must have required property \'email\'');
                expect(response.body[1].message).toBe('must have required property \'password\'');
            });

            test('should return status code 404 and when provided wrong email', async () => {
                const response = await supertest(app)
                    .post('/auth/logIn')
                    .send({
                        email: 'nitesh2981@gmail.com',
                        password: 'mohiT@2'
                    });
                expect(response.statusCode).toBe(404);
                expect(response.body.message).toBe('User does not exists');

            });

            test('should return status code 401 and when provided wrong password', async () => {
                const response = await supertest(app)
                    .post('/auth/logIn')
                    .send({
                        email: 'nitesh2980@gmail.com',
                        password: 'mohiT@2'
                    });
                expect(response.statusCode).toBe(401);
                expect(response.body.message).toBe('Credentials are wrong !!!');
            });
        });


        describe('verifyToken function testing ', () => {

            test('should return user roleId and user id if token is valid', async () => {
                const response = await auth.verifyToken(token, process.env.ACCESS_SECRET_KEY);
                expect(response.id).toBe('123');
                // expect(response.role).toBe('ADMIN');
            });
        });
    });

    describe('### ### ### User Controller ### ### ###', () => {

        describe('getUserDetails function testing', () => {

            test('should return user detail with status code 200 if provided valid user id', async () => {
                const response = await supertest(app)
                    .get(`/user/getUserDetail/${adminId}`)
                    .set('token', `Bearer ${token}`);
                expect(response.statusCode).toBe(200);
                expect(response.body.message).toBe('Data get successfully');

            });

            test('should return status code 401 and User Id Invalid !!! if provided invalid user id', async () => {
                const response = await supertest(app)
                    .get('/user/getUserDetail/644c1b6eb2b7affd981ab735')
                    .set('token', `Bearer ${token}`);
                expect(response.statusCode).toBe(401);
                expect(response.body.message).toBe('User Id Invalid !!!');

            });

            test('should return status code 400 and  if user id not provided and passed null or empty', async () => {
                const response = await supertest(app)
                    .get('/user/getUserDetail/')
                    .set('token', `Bearer ${token}`);
                expect(response.statusCode).toBe(400);
                expect(response.body.message).toBe('Requested URL /getUserDetail/ not found !!');
            });

        });
    });
});

describe('### ### ### Function testing by Mocked value ### ### ###', () => {
    const req = {
        body: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            role: 'USER',
            password: 'secret'
        }
    };
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new user and return a success response (by mock)', async () => {
        // mock the userModel.create function
        const mockUser = {
            _id: '123',
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            roleId: req.body.roleId
        };
        //mocking function
        userModel.create = jest.fn().mockResolvedValue(mockUser);

        // call the addUser function
        await admin.addUser(req, res);

        // expect the userModel.create function to be called with the correct data
        expect(userModel.create).toHaveBeenCalledWith({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            roleId: req.body.roleId,
            role: 'USER',
            password: req.body.password
        });

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            code: 200,
            message: 'User added successfully !!',
            data: {
                ACCESS_TOKEN: undefined,
                REFRESH_TOKEN: undefined,
                data: mockUser
            }
        });
    });

    const expectedUser = {
        firstName: 'Yogesh',
        lastName: 'Bhandari',
        email: 'hnegii2980@gmail.com',
        mobile: '9870860293',
        city: 'Kotdwara'
    };

    const mockResponse = {
        data: expectedUser
    };
    test('Get Admin Details function testing by mocked values', async () => {
        const req = {
            body: {
                firstName: 'Yogesh',
                lastName: 'Bhandari',
                email: 'hnegii2980@gmail.com',
                mobile: '9870860293',
                city: 'Kotdwara'
            },
            params: {
                id: '6461e0aac28c6b1fd491c52a'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        userModel.findById = jest.fn().mockResolvedValue(mockResponse);

        //now calling function 
        await admin.getAdminDetail(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json.mock.calls[0][0].data.data.data.email).toBe('hnegii2980@gmail.com');
        expect(res.json.mock.calls[0][0].data.data.data.mobile).toBe('9870860293');
        expect(res.json.mock.calls[0][0].message).toEqual('Data get successfully');
    });
});

afterAll(async () => {
    // delete all the data from database
    await userModel.deleteMany();
});