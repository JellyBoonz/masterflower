using System.Text.Json;
using CSharpIntegration.Models;

namespace CSharpIntegration.Services;

public class ApiService
{
    private static readonly JsonSerializerOptions JsonOptions = new JsonSerializerOptions
    {
        PropertyNameCaseInsensitive = true,
        PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
    };

    private readonly HttpClient _httpClient;
    private readonly string _apiBaseUrl;

    public ApiService(string apiBaseUrl)
    {
        _apiBaseUrl = apiBaseUrl.TrimEnd('/');
        _httpClient = new HttpClient();
    }

    public async Task<List<AuditRecord>> GetAllAuditsAsync()
    {
        var response = await _httpClient.GetAsync($"{_apiBaseUrl}/audits");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<AuditRecord>>(json, JsonOptions) ?? new List<AuditRecord>();
    }

    public async Task<List<OrderRecord>> GetAllOrdersAsync()
    {
        var response = await _httpClient.GetAsync($"{_apiBaseUrl}/orders");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<OrderRecord>>(json, JsonOptions) ?? new List<OrderRecord>();
    }

    public async Task<List<StoreRecord>> GetAllStoresAsync()
    {
        var response = await _httpClient.GetAsync($"{_apiBaseUrl}/stores");
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<StoreRecord>>(json, JsonOptions) ?? new List<StoreRecord>();
    }

    public void Dispose()
    {
        _httpClient?.Dispose();
    }
}