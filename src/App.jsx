import { useState } from "react";
import SearchForm from "./components/SearchForm";
import ResultTable from "./components/ResultTable";
import LoadingIndicator from "./components/LoadingIndicator";
import "./index.css";

export default function App() {
    const [studentId, setStudentId] = useState("");
    const [student, setStudent] = useState(null);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!studentId.trim()) {
            setError("Vui lòng nhập mã số sinh viên!");
            return;
        }

        setIsLoading(true);
        setError("");
        setStudent(null);
        setResults([]);

        try {
            await new Promise((res) => setTimeout(res, 600));

            const [svRes, hpRes, kqRes] = await Promise.all([
                fetch("/sinhvien.json").then((r) => r.json()),
                fetch("/hocphan.json").then((r) => r.json()),
                fetch("/ketqua.json").then((r) => r.json()),
            ]);

            const foundStudent = svRes.find((s) => s.sid === studentId);
            if (!foundStudent) throw new Error(`Không tìm thấy sinh viên có mã ${studentId}`);

            const studentResults = kqRes.filter((r) => r.sid === studentId);
            if (studentResults.length === 0) throw new Error("Sinh viên chưa có kết quả học tập.");

            const fullResults = studentResults.map((r) => {
                const hp = hpRes.find((h) => h.cid === r.cid);
                return { ...r, ...hp };
            });

            setStudent(foundStudent);
            setResults(fullResults);
        } catch (err) {
            setError(err.message || "Lỗi tải dữ liệu");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app">
            <h1>Tra cứu kết quả học tập</h1>
            <SearchForm
                studentId={studentId}
                setStudentId={setStudentId}
                onSearch={handleSearch}
            />

            {isLoading && <LoadingIndicator />}

            {error && <div className="error">{error}</div>}

            {student && results.length > 0 && (
                <ResultTable student={student} results={results} />
            )}
        </div>
    );
}
