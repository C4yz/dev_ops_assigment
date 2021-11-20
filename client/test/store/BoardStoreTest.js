import chai, {expect, assert} from 'chai';
import BoardStore from '../../src/stores/BoardStore.js';
import chaiSchema from 'chai-json-schema';

chai.use(chaiSchema);

describe('BoardStore',function(){
    it('getCourses Should return multiple JSON objects', function(){
        let boardStore = new BoardStore();
        let result = boardStore.getCourses();
        expect(result).to.be.jsonSchema;
    });

    it('Get one course should return a JSON object', function(){
        let boardStore = new BoardStore();
        let result = boardStore.getCourse(1);
        expect(result).to.be.jsonSchema;
    })

    it('PopulateStore Should set alot of values in an object', function(){
        let boardStore = new BoardStore();
        boardStore.populateStore();
        assert.typeOf(boardStore.course.courseid,'string', 'The id of the course')
        assert.typeOf(boardStore.course.title, 'string', 'The title of the course')
        assert.isObject(boardStore.course.tabs, 'All the different tabs')
    })

    
});