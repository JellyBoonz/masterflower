namespace CSharpIntegration.Models;

/// <summary>
/// Represents an audit record from the audits table.
/// Maps directly to the PostgreSQL audits table structure.
/// </summary>
public class AuditRecord
{
    /// <summary>
    /// Primary key - maps to audits.id
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Product SKU - maps to audits.sku
    /// </summary>
    public string Sku { get; set; } = string.Empty;

    /// <summary>
    /// Quantity audited - maps to audits.quantity
    /// </summary>
    public int Quantity { get; set; }

    /// <summary>
    /// Condition of the product - maps to audits.condition
    /// </summary>
    public string Condition { get; set; } = string.Empty;

    /// <summary>
    /// Store location (store number) - maps to audits.location
    /// </summary>
    public string Location { get; set; } = string.Empty;

    /// <summary>
    /// Name of the person who performed the audit - maps to audits.audited_by
    /// </summary>
    public string AuditedBy { get; set; } = string.Empty;

    /// <summary>
    /// Timestamp when the audit was created - maps to audits.created_at
    /// </summary>
    public DateTime CreatedAt { get; set; }
}

