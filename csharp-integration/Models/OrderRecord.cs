namespace CSharpIntegration.Models;

/// <summary>
/// Represents an order record from the orders table.
/// Maps directly to the PostgreSQL orders table structure.
/// </summary>
public class OrderRecord
{
    /// <summary>
    /// Primary key - maps to orders.id
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Product SKU - maps to orders.sku
    /// </summary>
    public string Sku { get; set; } = string.Empty;

    /// <summary>
    /// Order quantity - maps to orders.quantity
    /// </summary>
    public int Quantity { get; set; }

    /// <summary>
    /// Order status - maps to orders.order_status
    /// Valid values: "pending", "fulfilled", "cancelled"
    /// </summary>
    public string OrderStatus { get; set; } = string.Empty;

    /// <summary>
    /// Store location (store number) - maps to orders.location
    /// </summary>
    public string Location { get; set; } = string.Empty;

    /// <summary>
    /// Name of the person who placed the order - maps to orders.ordered_by
    /// </summary>
    public string OrderedBy { get; set; } = string.Empty;

    /// <summary>
    /// Timestamp when the order was created - maps to orders.ordered_at
    /// </summary>
    public DateTime OrderedAt { get; set; }
}

