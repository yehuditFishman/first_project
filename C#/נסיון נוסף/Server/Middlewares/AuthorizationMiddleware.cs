public class AuthorizationMiddleware
{
	private readonly RequestDelegate _next;

	public AuthorizationMiddleware(RequestDelegate next)
	{
		_next = next;
	}

	public async Task InvokeAsync(HttpContext context)
	{
		// ����� ����� ��-Header
		var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

		// ����� �� ����� ��� �� �� ����
		if (string.IsNullOrEmpty(token) || !IsValidToken(token))
		{
			context.Response.StatusCode = StatusCodes.Status401Unauthorized;
			await context.Response.WriteAsync("Unauthorized");
			return;
		}

		await _next(context); // ���� ������ ���
	}

	private bool IsValidToken(string token)
	{
		// ����� ����� (���� ��� JWT �� ���� ������)
		return token == "ValidTokenExample"; // ����� ����
	}
}