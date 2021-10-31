namespace BossInfoProject.Models
{
    public class ModifiedBooking
    {
        public int BookingId { get; set; }
        public string CustomerName { get; set; }
        public string ArrivalDate { get; set; }
        public string DepartureDate { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; }

    }
}
