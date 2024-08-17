export function downloadDataAsFile(data: unknown, fileName: string): void {
    const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(data));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", fileName);
    a.click();
}
