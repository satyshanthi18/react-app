const {generateSerialNumber} = require('../../../app/utils/generateSerialNumber')
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;
let db;

beforeAll(async () => {
  mongoServer =  await MongoMemoryServer.create();;
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  db = mongoose.connection;
});

afterAll(async () => {
  await db.close();
  await mongoose.disconnect();
  await mongoServer.stop();
});




test('Serial Number Length',async ()=>{
    let result = await generateSerialNumber('X')
    expect(result.length).toBe(9)
})

test('Serial Number Uniqueness',async()=>{
    let result = await generateSerialNumber('A')
    let result1 = await generateSerialNumber('B')
    let result2 = await generateSerialNumber('A')
    expect(result).not.toBe(result1)
    expect(result).toBe(result2)
})

test('First Letter Verification',async()=>{
    let result = await generateSerialNumber('A')
    let month = new Date().getMonth()
    let monthCode = String.fromCharCode((65+month))
    expect(result[0]).toBe(monthCode)
    expect(result[0] >= 'A' && result[0] <= 'Z').toBe(true);
})

test('Second and Third Letter Verification',async()=>{
    let result = await generateSerialNumber('A')
    let year = new Date().getFullYear()
    year = year%100
    expect(Number(result[1]+result[2])).toBe(year)
})

test('Fourth and Fifth Letter Verification',async()=>{
    let result = await generateSerialNumber('A')
    let date = new Date().getDate()
    expect(Number(result[3]+result[4])).toBe(date)
})

test('Sixth Letter Verification',async()=>{
    let result = await generateSerialNumber('A')
    expect(result[5]).toBe('A')
    expect(result[5] >= 'A' && result[5] <= 'Z').toBe(true);
})

test('Seventh, Eighth and Nineth letter verification',async()=>{
    let result = await generateSerialNumber('A')
    expect(isNaN(Number(result[6] + result[7] + result[8]))).not.toBe(true)
})