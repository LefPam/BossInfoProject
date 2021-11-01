using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using BossInfoProject.Models;
using System.Globalization;

namespace BossInfoProject.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IConfiguration _configuration;


        public BookingController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IEnumerable<ModifiedBooking> Get()
        {
            using (var context = new BossInfoProjectContext())
            {
                return ModifyBookingList(context.Bookings.ToList().OrderBy(o => o.BookingId).ToList()); ;
            }

        }

        [HttpPost]
        public JsonResult Post(bookingtest bk)
        {
            using (var context = new BossInfoProjectContext())
            {
                var booking = new Booking();
                booking.CustomerName = bk.CustomerName;
                var test = Convert.ToDateTime(bk.ArrivalDate);
                booking.ArrivalDate = Convert.ToDateTime(bk.ArrivalDate);
                booking.DepartureDate = Convert.ToDateTime(bk.DepartureDate);
                booking.RoomId = bk.RoomId;
                context.Bookings.Add(booking);
                try
                {
                    context.SaveChanges();
                    return new JsonResult("Added Successfully");
                }
                catch (Exception ex)
                {
                    return new JsonResult("Room Already Exists");
                }
             
            }

        }
        List<ModifiedBooking> ModifyBookingList(List<Booking> tmp)
        {
            CultureInfo culture = new CultureInfo("pt-BR");
            var Modifiedlist = new List<ModifiedBooking>();
            
            foreach (Booking t in tmp)
            {
                var NewBooking = new ModifiedBooking();
                NewBooking.BookingId = t.BookingId;
                NewBooking.CustomerName = t.CustomerName;
                NewBooking.ArrivalDate = t.ArrivalDate.ToString("d", culture);
                NewBooking.DepartureDate = t.DepartureDate.ToString("d", culture);
                NewBooking.RoomId = t.RoomId;
                using (var context = new BossInfoProjectContext())
                {
                    NewBooking.RoomName = context.Rooms.Where(rm => rm.RoomId == t.RoomId).ToList().First().RoomName.ToString(); ;
                    Modifiedlist.Add(NewBooking);
                }
            }
            return Modifiedlist;
        }

        //HttpGet-HttpPost-HttpPut with SqlClient Conectivity. (Bad Practice)
        //[HttpGet]
        //public JsonResult Get()
        //{
        //    string query = @"
        //                 Select b.BookingId
        //                ,b.CustomerName
        //                ,convert(varchar(10),b.arrivalDate,103) as ArrivalDate
        //                ,convert(varchar(10),b.departuredate,103)  as DepartureDate
        //                ,(select roomName from room where roomid=b.roomid) as RoomName
        //                from booking b
        //                ";


        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("SqlConn");
        //    SqlDataReader myReader;
        //    using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        //    {

        //        myCon.Open();
        //        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        //        {
        //            myReader = myCommand.ExecuteReader();
        //            table.Load(myReader);
        //            myReader.Close();
        //            myCon.Close();
        //        }
        //    }

        //    return new JsonResult(table);

        //}

        //[HttpPost]
        //public JsonResult Post(bookingtest rm)
        //{

        //    string query = @"

        //    INSERT INTO booking(customerName,arrivalDate,departureDate,roomId)
        //    VALUES (@CustomerName,@ArrivalDate,@DepartureDate,@RoomId)";

        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("SqlConn");
        //    SqlDataReader myReader;
        //    using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        //    {

        //        myCon.Open();
        //        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        //        {
        //            myCommand.Parameters.AddWithValue("@CustomerName", rm.CustomerName);
        //            myCommand.Parameters.AddWithValue("@ArrivalDate", rm.ArrivalDate);
        //            myCommand.Parameters.AddWithValue("@DepartureDate", rm.DepartureDate);
        //            myCommand.Parameters.AddWithValue("@RoomId", rm.RoomId);
        //            myReader = myCommand.ExecuteReader();
        //            table.Load(myReader);
        //            myReader.Close();
        //            myCon.Close();
        //        }
        //    }

        //    return new JsonResult("Added Successfully");

        //}

        //[HttpPut]
        //public JsonResult Put(bookingtest rm)
        //{
        //    string query = @"
        //                 Update room set roomname= @RoomName
        //                 where roomId=@RoomId
        //                ";

        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("SqlConn");
        //    SqlDataReader myReader;
        //    using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        //    {

        //        myCon.Open();
        //        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        //        {
        //            myCommand.Parameters.AddWithValue("@RoomId", rm.RoomId);
        //            myCommand.Parameters.AddWithValue("@RoomName", rm.RoomName);
        //            myReader = myCommand.ExecuteReader();
        //            table.Load(myReader);
        //            myReader.Close();
        //            myCon.Close();
        //        }
        //    }

        //    return new JsonResult("Updated Successfully");

        //}



    }
}
