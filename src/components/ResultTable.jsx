export default function ResultTable({ student, results }) {
    return (
        <div id="result">
            <h2>Thông tin sinh viên</h2>
            <p>{`${student.name} - ${student.sid} - Ngày sinh: ${student.dob}`}</p>

            <h2>Kết quả học tập</h2>
            <table>
                <thead>
                <tr>
                    <th>Học kỳ</th>
                    <th>Mã HP</th>
                    <th>Tên học phần</th>
                    <th>Tín chỉ</th>
                    <th>Điểm số</th>
                    <th>Điểm chữ</th>
                </tr>
                </thead>
                <tbody>
                {results.map((res, idx) => (
                    <tr key={idx}>
                        <td>{res.term}</td>
                        <td>{res.cid}</td>
                        <td>{res.name}</td>
                        <td>{res.credits}</td>
                        <td>{res.score}</td>
                        <td>{res.grade}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
