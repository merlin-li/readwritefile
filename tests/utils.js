var utils = require('../lib/utils.js');
var expect = require('chai').expect;

describe ('utils: 工具方法测试', () => {
    // defer对象测试
    describe('utils.getDefer', () => {
        var deferred = utils.getDefer();
        it('defer成功', () => {
            deferred.resolve(true);
            return deferred.promise.then((data) => {
                expect(data).to.be.equal(true);
            });
        });

        it('defer失败', () => {
            deferred.reject(true);
            return deferred.promise.then(() => {}, (data) => {
                expect(data).to.be.equal(true);
            });
        });
    });

    //when测试
    describe('utils.when', () => {
        var deferred1 = utils.getDefer();
        var deferred2 = utils.getDefer();
        var deferred3 = utils.getDefer();
        var deferred4 = utils.getDefer();

        it('when成功', () => {
            deferred1.resolve(true);
            deferred2.resolve(true);
            return utils.when([deferred1.promise, deferred2.promise]).then((data) => {
                expect(data).to.be.deep.equal([true, true]);
            });
        });

        it('when失败', () => {
            deferred3.resolve(true);
            deferred4.reject(false);
            return utils.when([deferred3.promise, deferred4.promise]).then(() => {}, (data) => {
                expect(data).to.be.equal(false);
            })
        })
    })
})