export default function SearchForm({ studentId, setStudentId, onSearch }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") onSearch();
    };

    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="Nhập mã số sinh viên"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={onSearch}>Tra cứu</button>
        </div>
    );
}
