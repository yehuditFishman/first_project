public class AuthorizationMiddleware
{
	private readonly RequestDelegate _next;

	public AuthorizationMiddleware(RequestDelegate next)
	{
		_next = next;
	}

	public async Task InvokeAsync(HttpContext context)
	{
		// שליפת הטוקן מה-Header
		var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

		// בדיקה אם הטוקן חסר או לא תקין
		if (string.IsNullOrEmpty(token) || !IsValidToken(token))
		{
			context.Response.StatusCode = StatusCodes.Status401Unauthorized;
			await context.Response.WriteAsync("Unauthorized");
			return;
		}

		await _next(context); // המשך לצינור הבא
	}

	private bool IsValidToken(string token)
	{
		// בדיקת הטוקן (למשל מול JWT או בסיס נתונים)
		return token == "ValidTokenExample"; // דוגמה בלבד
	}
}