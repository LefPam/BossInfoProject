using System;
using System.Collections.Generic;

#nullable disable

namespace BossInfoProject.Models
{
    public partial class Booking
    {
        public int BookingId { get; set; }
        public string CustomerName { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set; }
        public int RoomId { get; set; }

        public virtual Room Room { get; set; }
    }
}
