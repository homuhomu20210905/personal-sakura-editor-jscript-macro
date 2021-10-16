require('../common/util.js')


test('util.topLower', () => {
    var func = util.topLower;
    //エラーにしたい場合は関数でラップする必要がありそう
    expect(()=>func(1)).toThrow();
    expect(func('abc')).toBe('abc');
    expect(func('Abc')).toBe('abc');
    expect(func('ABc')).toBe('aBc');
    expect(func('ABC')).toBe('aBC');
    expect(func('あいうえお')).toBe('あいうえお');
    expect(func('bあいうえお')).toBe('bあいうえお');
    expect(func('_bあいうえお')).toBe('_bあいうえお');
});
test('util.topUpper', () => {
    var func = util.topUpper;
    //エラーにしたい場合は関数でラップする必要がありそう
    expect(()=>func(1)).toThrow();
    
    expect(func('abc')).toBe('Abc');
    expect(func('Abc')).toBe('Abc');
    expect(func('ABc')).toBe('ABc');
    expect(func('ABC')).toBe('ABC');
    expect(func('あいうえお')).toBe('あいうえお');
    expect(func('bあいうえお')).toBe('Bあいうえお');
    expect(func('_bあいうえお')).toBe('_bあいうえお');
});


test('util.camel', () => {
    var func = util.camel
    expect(func('ABC')).toBe('abc');
    expect(func('abc')).toBe('abc');
    expect(func('a_b_c')).toBe('aBC');
    expect(func('a_b_cd')).toBe('aBCd');
    expect(func('test-value')).toBe('testValue');
    expect(func('a-b-c	a_b_c')).toBe('aBC	aBC');
    expect(func('a_b_c')).toBe('aBC');
});
test('util.convertMember', () => {
    const func = util.convertMember
    let obj = func('TEST_VALUE');
    expect(obj.camel).toBe('testValue');
    expect(obj.pascal).toBe('TestValue');
    expect(obj.snake).toBe('test_value');
    expect(obj.get).toBe('getTestValue');
    expect(obj.set).toBe('setTestValue');

    obj = func('TEST-VALUE');
    expect(obj.camel).toBe('testValue');
    expect(obj.pascal).toBe('TestValue');
    expect(obj.snake).toBe('test_value');
    expect(obj.get).toBe('getTestValue');
    expect(obj.set).toBe('setTestValue');
});


test('util.getter', () => {
    var func = util.getter
    expect(func('a_b_c')).toBe('getABC');
    expect(func('a_b_cd')).toBe('getABCd');
    expect(func('test-value')).toBe('getTestValue');
    expect(func('a-b-c	a_b_c')).toBe('getABC	getABC');
    expect(func('a_b_c')).toBe('getABC');
});
test('util.pascal', () => {
    var func = util.pascal
    expect(func('ABC')).toBe('Abc');
    expect(func('Abc')).toBe('Abc');
    expect(func('a_b_c')).toBe('ABC');
    expect(func('a_b_cd')).toBe('ABCd');
    expect(func('test-value')).toBe('TestValue');
    expect(func('a-b-c	a_b_c')).toBe('ABC	ABC');
    expect(func('a_b_c')).toBe('ABC');
});
test('util.setter', () => {
    var func = util.setter
    expect(func('a_b_c')).toBe('setABC');
    expect(func('a_b_cd')).toBe('setABCd');
    expect(func('test-value')).toBe('setTestValue');
    expect(func('a-b-c	a_b_c')).toBe('setABC	setABC');
    expect(func('a_b_c')).toBe('setABC');
});
test('util.snake', () => {
    var func = util.snake
    expect(func('abc')).toBe('abc');
    expect(func('aBc')).toBe('a_bc');
    expect(func('abC')).toBe('ab_c');
});


// ヒアドキュメント。(一致させられないので一旦この値でOKとする）
test('util.template', () => {
const testValue =`abcdefg`
const template = util.template(function(){/*
abcdefg
*/}).split(" ").join("")
    expect(template).toBe(testValue);
    
    
    expect(util.template()).toBe(null);
    expect(util.template(1)).toBe(null);
    expect(util.template("test")).toBe(null);
});


test('isほげほげの使われないケース',()=>{
    var list = [util.isHump
               ,util.isKebab
               ,util.isSnake
               ,util.isSplit]
    
    list.forEach(check =>{
        expect(check('a	   ')).toBe(false)
    });
});

