module.exports = {
    /**
    * 获取Defer对象
    * @return {[type]} [description]
    */
    getDefer() {
        let deferred = {};
        deferred.promise = new Promise((resolve, reject) => {
            deferred.resolve = resolve;
            deferred.reject = reject;
        });
        return deferred;
    },
    /**
    * promise when 方法
    * @param promise promise数组
    * @return {[type]} [description]
    */
    when(promise) {
        let deferred = this.getDefer();
        Promise.all(promise).then((data) => {
            deferred.resolve(data);
        }, (err) => {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}