export function Input({ label_name, placeholder, value, type, name, onChange }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="font-semibold">{label_name}</label>
            <input id={name} name={name} type={type} placeholder={placeholder} value={value}
                onChange={onChange} className="p-2 rounded border border-gray-400" />
        </div>
    );
}
