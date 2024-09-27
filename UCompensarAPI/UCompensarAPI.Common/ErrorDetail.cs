namespace UCompensarAPI.Common
{
    public class ErrorDetail
    {
        public int StatusCode { get; set; }
        public string? Message { get; set; }
        public string? StackTrace { get; set; }
    }
}
