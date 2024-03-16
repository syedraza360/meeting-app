const Global = {


    async fetchpost(method, path, body) {
        return fetch(`${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "X-Company-Login": "regex1",
                "X-Token": "4795ce91a8c0ae2850193a816785e16865cb9be80de0769af79dab07708269d1"
            },
            body: body
        });
    }
}
export default Global;