import axios from "axios"

export const getGames = () => {
    axios
        .get('http://localhost:8000/api/game')
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.error(error.message)
        })
}

const user = {
    
    firstName: "Joaquin",
    lastName: "Lucchetti",
    email: "joaquinlucchetti@gmail.com",
    age: 22,
    isAdmin: false,
    password: "asd123",
    phoneNum: "+5492216255554",
}

const user1 = {
    
    firstName: "Jeremias",
    lastName: "Lucchetti",
    email: "anakin_lla@hotmail.com",
    age: 22,
    isAdmin: true,
    password: "asd123",
    phoneNum: "+5492216255554",
}

const url = "http://localhost:8000/api/auth/signup"


export const newUser = async () => {
    try{
        const res = await axios.post(url, user)
        console.log(res.data)
    } catch (error: any) {
        console.log(error)
    }

}


const userCart = 'anakin_lla@hotmail.com'
const urlCart = `http://localhost:8000/api/cart/${userCart}`


const R6 = { name: "Tom Clancy's Rainbow Six® Siege", price: 999 }
const GOW = { name: "God of War", price: 4199 }
const HZD = { name: 'Horizon Zero Dawn Complete Edition', price: 2100 } 


export const updateCart = async () => {
    try{
        const res = await axios.put(urlCart, {$push: {carts: HZD}})
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}



export const emptyCart = async () => {
    try {
        const res = await axios.delete(urlCart)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}

