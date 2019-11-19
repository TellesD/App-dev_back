const env = process.env.NODE_ENV || 'dev';

const config = () => {
    switch (env) {
        case 'dev':
        return {
            bd_string: 'mongodb+srv://user-admin:Vic199931@cluster-dev-mfzfs.mongodb.net/test?retryWrites=true&w=majority',
            jwt_pass: 'aj18di12*i2ls8*12dklc-lc;19xk,quoew',
            jwt_expires_in: '360d'
        }

        case 'hml':
        return {    
            bd_string: 'mongodb+srv://user-admin:Vic199931@cluster-dev-mfzfs.mongodb.net/test?retryWrites=true&w=majority',
            jwt_pass: 'aj18di12*i2ls8*12dklc-lc;19xk,quoew',
            jwt_expires_in: '360d'
        }

        case 'prod':
        return {
            bd_string: 'mongodb+srv://user-admin:Vic199931@cluster-dev-mfzfs.mongodb.net/test?retryWrites=true&w=majority',
            jwt_pass: 'jfasdofjiof342342kjki4$@#$@#dsakdfsaf',
            jwt_expires_in: '360d'
        }
    }
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();