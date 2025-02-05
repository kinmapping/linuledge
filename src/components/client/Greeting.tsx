import { useState } from 'react';

export default function Greeting({ messages }: { messages: string[] }) {
    const randomMessage = () => messages[Math.floor(Math.random() * messages.length)];

    const [greeting, setGreeting] = useState(messages[0]);

    return (
        <div>
            <h3>{greeting}！ 訪問いただきありがとうございます！</h3>
            <button
                id='changeGreeting'
                type='button'
                aria-label='挨拶メッセージを変更する'
                onClick={() => setGreeting(randomMessage())}
            >
                新しい挨拶
            </button>
        </div>
    );
}
