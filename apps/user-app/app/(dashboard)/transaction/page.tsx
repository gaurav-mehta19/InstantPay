
import React from 'react';

import { P2pTransaction } from '../../../components/p2pTransaction';
import { OnrampTransaction } from '../../../components/onRampTransaction';
import { getP2Ptransaction, getTransaction } from '../../../lib/utils/transaction';

// Main Transaction Page Component
export default async function Transaction() {
    const p2ptransaction = await getP2Ptransaction(); // Fetch and process transactions
    const onRampTransaction = await getTransaction()     

    // Render the transactions
    return (
        <div className='w-screen'>
        <div className="grid grid-cols-10 gap-3 mt-10">
            <div className="col-start-2 col-span-4 min-height-525">
                <P2pTransaction transaction={p2ptransaction} />
            </div>
            <div className="col-start-auto col-span-4">
                <OnrampTransaction transaction={onRampTransaction} />
            </div>
        </div>
        </div>
    );
}
