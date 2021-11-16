import { assert } from 'chai';
import { getCourses } from '../../src/stores/BoardStore.js';

describe('BoardStore',function(){
    it('getCourses Should return an Array of objecs', function(){
        let result = getCourses();
        assert.isArray(result, 'All courses');
    });
});