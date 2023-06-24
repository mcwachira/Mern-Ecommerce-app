import bcrypt from 'bcryptjs'


const users = [


    {
        name:'Admin User',
        email:'admin@email.com',
        password:bcrypt.hashSync('12345678', 10),
        isAdmin:true,
    },
    {
        name:'John Doe',
        email:'john@email.com',
        password:bcrypt.hashSync('12345678', 10),
        isAdmin:true,
    },

    {
        name:'Jane Doe',
        email:'jane@email.com',
        password:bcrypt.hashSync('12345678', 10),
        isAdmin:true,
    },
]

export default  users