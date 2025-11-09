namespace CSharpIntegration.Models;

/// <summary>
/// Represents an store record from the stores table.
/// Maps directly to the PostgreSQL stores table structure.
/// </summary>
public class StoreRecord
{
    /// <summary>
    /// Primary key - maps to stores.id
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Store number - maps to stores.store_number
    /// </summary>
    public string StoreNumber { get; set; } = string.Empty;

    /// <summary>
    /// Store name - maps to stores.store_name
    /// </summary>
    public string StoreName { get; set; } = string.Empty;

    /// <summary>
    /// Store address - maps to stores.address
    /// </summary>
    public string Address { get; set; } = string.Empty;

    /// <summary>
    /// Timestamp when the store was created - maps to stores.created_at
    /// </summary>
    public DateTime CreatedAt { get; set; }

    /// <summary>
    /// Timestamp when the store was updated - maps to stores.updated_at
    /// </summary>
    public DateTime UpdatedAt { get; set; }
}