
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
    "Ice Cream",
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

    const [guesses, setGuesses] = useState<string[]>(Array(7).fill(''));
    const [product, setProduct] = useState(null)
    const [currentInput, setCurrentInput] = useState<string>('');


    const [isFetching, setIsFetching] = useState(false)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newGuess = e.target.value;

        if (newGuess.match(/^[0-9]*\.?[0-9]{0,2}$/)) {
            setCurrentInput(newGuess);
        }
        else {
            console.log("invalid")
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {


            console.log("pressed")
            setGuesses(prevGuesses => {
                const updatedGuesses = [...prevGuesses];
                const firstEmptyIndex = updatedGuesses.indexOf('');
                if (firstEmptyIndex !== -1) {
                    updatedGuesses[firstEmptyIndex] = currentInput;
                    console.log(updatedGuesses)
                }
                return updatedGuesses;
            });
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
            <div className="w-[600px] bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-center items-center mb-6">
                    <h2 className="text-2xl font-bold">Amazondle {today}<br></br>Todays Theme: {randomItems[getCurrentDay()]}</h2>



                </div>
                <div className="border rounded-lg p-4 mb-4 flex flex-col items-center">
                    <img
                        alt="Product"
                        className="mb-4 h-[200px] w-[200px]"
                        height="200"
                        src={product?.picture}
                        style={{
                            objectFit: "contain",
                            width: "50%",
                            height: "auto"
                        }}
                        width="200"
                    />
                    <h2 className="text-lg font-bold text-center">
                        {product?.title}
                    </h2>
                </div>

                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Guesses:</h3>
                    <div className="grid gap-2">
                        {guesses.map((guess, index) => (
                            <div key={index} className={`bg-gray-300 rounded h-10 w-full flex items-center justify-center ${guess ? 'bg-blue-200' : ''}`}>
                                {guess}
                            </div>
                        ))}
                    </div>
                </div>
            
                <div className="flex items-center justify-between border rounded-lg p-2">
                    <DollarSignIcon className="text-xl" />
            <input
                type="text"
                className="flex-1 mx-2 border-none bg-transparent text-center"
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder=""
                maxLength="7"
            />
            <ArrowRightIcon className="text-xl" />
        </div>
            </div >
        </div >
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