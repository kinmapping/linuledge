import { useState } from 'react';

interface IpRange {
    networkAddress: string;
    broadcastAddress: string;
    usableAddresses: string[];
    usableCount: number;
}

interface CidrEntry {
    id: number;
    value: string;
}

const IpCalculator = () => {
    const [cidrs, setCidrs] = useState<CidrEntry[]>([
        { id: 0, value: '' },
        { id: 1, value: '' },
        { id: 2, value: '' },
        { id: 3, value: '' },
    ]);
    const [calculations, setCalculations] = useState<(IpRange | null)[]>([null, null, null, null]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const calculateIpRange = (cidr: string): IpRange | null => {
        if (!cidr) return null;

        try {
            // 基本的なCIDR形式の検証
            const trimmedCidr = cidr.trim();
            const [ip, prefix] = trimmedCidr.split('/');
            const prefixNum = Number.parseInt(prefix, 10);

            if (prefixNum < 0 || prefixNum > 32) return null;

            const ipParts = ip.split('.').map(part => Number.parseInt(part, 10));
            if (
                ipParts.length !== 4 ||
                ipParts.some(part => Number.isNaN(part) || part < 0 || part > 255)
            ) {
                return null;
            }

            // IPアドレスを32ビット整数に変換
            const ipInt = ipParts.reduce((acc, part) => (acc << 8) + part, 0);

            // ネットマスクを計算
            const mask = prefixNum === 0 ? 0 : 0xffffffff << (32 - prefixNum);

            const networkInt = ipInt & mask;
            const broadcastInt = networkInt | (~mask >>> 0);

            const intToIp = (int: number) =>
                [(int >>> 24) & 0xff, (int >>> 16) & 0xff, (int >>> 8) & 0xff, int & 0xff].join(
                    '.',
                );

            const networkAddress = intToIp(networkInt);
            const broadcastAddress = intToIp(broadcastInt);

            const usableCount =
                prefixNum < 31 ? 2 ** (32 - prefixNum) - 2 : prefixNum === 31 ? 0 : 1;
            const usableAddresses: string[] = [];

            if (usableCount > 0) {
                for (let i = 1; i <= usableCount; i++) {
                    usableAddresses.push(intToIp(networkInt + i));
                }
            }

            return {
                networkAddress,
                broadcastAddress,
                usableAddresses,
                usableCount,
            };
        } catch {
            return null;
        }
    };

    const handleInputChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement | null;
        if (!target) return;

        const newCidrs = cidrs.map(cidr =>
            cidr.id === id ? { ...cidr, value: target.value } : cidr,
        );

        setCidrs(newCidrs);

        const result = calculateIpRange(target.value);
        // console.log(`Calculation result for CIDR ${id}:`, result);

        const newCalculations = [...calculations];
        newCalculations[id] = result;
        setCalculations(newCalculations);
    };

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className='mx-auto max-w-2xl p-4'>
            <h2 className='mb-4 font-bold text-xl'>IP Address Calculator</h2>

            {cidrs.map(cidr => (
                <div key={cidr.id} className='mb-6 rounded-lg border bg-white p-4 shadow-sm'>
                    <div className='mb-4'>
                        <label
                            htmlFor={`cidr-${cidr.id}`}
                            className='mb-2 block font-medium text-sm'
                        >
                            CIDR #{cidr.id + 1} (e.g., 192.168.1.0/24)
                        </label>
                        <input
                            type='text'
                            id={`cidr-${cidr.id}`}
                            value={cidr.value}
                            onChange={e => handleInputChange(cidr.id, e)}
                            placeholder='192.168.1.0/24'
                            className='w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    {calculations[cidr.id] && (
                        <div className='mt-2'>
                            <div
                                onClick={() => toggleExpand(cidr.id)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        toggleExpand(cidr.id);
                                    }
                                }}
                                className='flex cursor-pointer items-center justify-between rounded-md bg-gray-50 p-2'
                            >
                                <div>
                                    <p className='font-medium'>
                                        Network: {calculations[cidr.id]?.networkAddress}
                                    </p>
                                    <p className='text-gray-600 text-sm'>
                                        Available IPs: {calculations[cidr.id]?.usableCount}
                                    </p>
                                </div>
                                {/* {expandedIndex === cidr.id ? (
                                    <ChevronUp size={20} />
                                ) : (
                                    <ChevronDown size={20} />
                                )} */}
                            </div>

                            {expandedIndex === cidr.id && (
                                <div className='mt-2 rounded-md bg-gray-50 p-2'>
                                    <p className='mb-2'>
                                        Broadcast: {calculations[cidr.id]?.broadcastAddress}
                                    </p>
                                    <div className='max-h-40 overflow-y-auto text-xs'>
                                        <p className='mb-1 font-medium'>Available IP Addresses:</p>
                                        {calculations[cidr.id]?.usableAddresses.map(ip => (
                                            <p key={ip} className='text-gray-600'>
                                                {ip}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default IpCalculator;
