export default function ModifHr({ left, text, right, color }) {
    return (
        <div className="flex items-center px-3 lg:px-10 py-[4%]" style={{ color , fontFamily: 'agatho' }}>
            <hr style={{ width: `${left}%`, borderColor: color }} className="border-t" />
            <p className="leading-none mx-2">{text}</p>
            <hr style={{ width: `${right}%`, borderColor: color }} className="border-t" />
        </div>
    );
}
