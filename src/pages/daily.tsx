
import './daily.css';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'



function getCurrentDate(): string {
    const now = new Date();
    return now.toLocaleDateString("en-US");
}

function getCurrentDay(): number {
    const now = new Date();
    return now.getDate();
}

const randomItems: string[] = [
    "Microwave",
    "Spaghetti",
    "Refrigerator",
    "T-shirt",
    "Jeans",
    "Apple",
    "Toaster",
    "Blender",
    "Rice",
    "Coffee Maker",
    "Sweater",
    "Pants",
    "Banana",
    "Dishwasher",
    "Oven",
    "Chicken",
    "Washing Machine",
    "Hoodie",
    "Shoes",
    "Broccoli",
    "Vacuum Cleaner",
    "Skirt",
    "Carrots",
    "Jacket",
    "Toaster Stroodle",
    "Air Fryer",
    "Bread",
    "Dress",
    "Pizza",
    "Slow Cooker",
    "Hat",
    "Tomatoes",
    "Iron",
    "Steak",
    "Scarf",
    "Mixer",
    "Soup",
    "Socks",
    "Espresso Machine",
    "Salad",
    "Tie",
    "Grill",
    "Cookies",
    "Fan",
    "Cheese",
    "Sandwich Maker",
    "Berries",
    "Gloves",
    "Electric Kettle",
    "Yogurt"
];


async function fetchProduct(item: string): Promise<any> {
    try {
        const response = await axios.get("https://c9a1-69-109-176-86.ngrok-free.app/api/scrape", {
            params: { item }
        });
        console.log('Product fetched:', response.data);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}





const today = getCurrentDate();

async function init() {
    const prod = await fetchProduct(randomItems[getCurrentDay()]);

    return prod;
}

export default function Component() {

    const [guesses, setGuesses] = useState<string[]>([]);
    const [product, setProduct] = useState(null)
    const [currentInput, setCurrentInput] = useState<string>('');
    const [attempts, setAttempts] = useState(0)
    const normalizedPrice = parseFloat(product?.price.replace(/[^\d.-]/g, ''));
    const [isCorrect, setisCorrect] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [inputError, setInputError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newGuess = e.target.value;

        if (newGuess.match(/^\d+\.\d{2}$/)) {
            
            setAttempts(attempts + 1);
            
            setCurrentInput(newGuess);
        }
        else {
            setCurrentInput("Invalid Input")
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const normalizedPrice = parseFloat(product?.price.replace(/[^\d.-]/g, ''));
        
        if (e.key === 'Enter' && currentInput && isCorrect === false) {
            var msg = "";
            setisCorrect(parseFloat(currentInput) === normalizedPrice);
            const currentIsCorrect = parseFloat(currentInput) === normalizedPrice;
            const priceDifference = normalizedPrice - parseFloat(currentInput);
            console.log(currentInput)
            console.log(product?.price)
            console.log(isCorrect)
            if(currentInput === "Invalid Input"){
                msg = "Invalid Input";
            }
            else if (Math.abs(priceDifference) <= .1) {
                msg = `$${currentInput} is Within 10 Cents`;
                }
            else if (Math.abs(priceDifference) <= .5) {
                msg = `$${currentInput} is Within 50 Cents`;
                }
             else if (Math.abs(priceDifference) <= 1) {
            msg = `$${currentInput} is Within a Dollar`;
            } else if (priceDifference > 5) {
            msg = `$${currentInput} is Much Lower`;
            } else if (priceDifference < -5) {
            msg = `$${currentInput} is Much Higher`;
            } else if (priceDifference > 0) {
            msg = `$${currentInput} is Lower`;
            } else if (priceDifference < 0) {
            msg = `$${currentInput} is Higher`;
        }
           
            setGuesses(prevGuesses => [...prevGuesses, { guess: currentIsCorrect ? `${currentInput} is Correct!` : msg, correct: currentIsCorrect }]);
            
            setCurrentInput('');
           
        }

    };




    useEffect(() => {
        setIsFetching(true)
        init().then((product) => {

            setProduct(product)
            setIsFetching(false)
        })
    }, [])



    return (
        <div className="flex justify-center p-6 min-h-screen bg-gradient-to-r from-orange-500 to-black">
            <div className="w-[600px] bg-white p-8 rounded-lg shadow-lg flex flex-col">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold">Amazondle {today}<br></br>Todays Theme: {randomItems[getCurrentDay()]}</h2>
                </div>
                <div className="border-4 border-gray-400 rounded-lg p-4 mb-4 flex flex-col items-center">
                    <img
                        alt="Product"
                        className="mb-4" // 
                        src={product?.picture}
                        style={{
                            objectFit: "contain",
                            maxHeight: "200px",
                            maxWidth: "100%",
                        }}
                    />
                    <h2 className="text-lg font-bold text-center">
                        {product?.title}
                    </h2>
                </div>

                <div className="mb-6 w-full text-center">
            <h3 className="font-semibold text-center font-bold">Guesses:</h3>
            <div className="grid gap-2">
                {guesses.map((item, index) => (
                    <div key={index} className={`rounded h-10 w-full flex items-center justify-center ${item.correct ? 'bg-green-300' : 'bg-red-300'}`}>
                        
                        {item.guess}
                    </div>
                        ))}
                    </div>
                </div>


                <div className="flex items-center justify-between border rounded-lg p-2 mt-auto">
                    <DollarSignIcon className="text-xl" />
                    <input
                        type="text"
                        className="flex-1 mx-2 border-none bg-transparent text-center"
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        placeholder=""
                        maxLength="20"
                    />
                    <ArrowRightIcon className="text-xl" />
                </div>
            </div>
        </div>
    )
}



function ArrowRightIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}


function DollarSignIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="12" x2="12" y1="2" y2="22" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
    )
}