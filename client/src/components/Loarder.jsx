export function Loader({ message }) {
    return (
        <div className="flex items-center justify-center">
            <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
            <div>{message}</div>
        </div>
    )
}