using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using BossInfoProject.Models;


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
        public JsonResult Get()
        {
            string query = @"
                         Select b.bookingId
,b.customerName
 ,convert(varchar(10),b.arrivalDate,103) as arrivaldate
 ,convert(varchar(10),b.departuredate,103)  as departuredate
,(select roomName from room where roomid=b.roomid) as roomid 
from booking b
                        ";
           

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SqlConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);

        }

        [HttpPost]
        public JsonResult Post(bookingtest rm)
        {

            //string query = @"
            //             INSERT INTO room (roomName) VALUES (@RoomName)
            //            ";

            string query = @"

            INSERT INTO booking(customerName,arrivalDate,departureDate,roomId)
            VALUES (@CustomerName,@ArrivalDate,@DepartureDate,@RoomId)";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SqlConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@CustomerName", rm.CustomerName);
                    myCommand.Parameters.AddWithValue("@ArrivalDate", rm.ArrivalDate);
                    myCommand.Parameters.AddWithValue("@DepartureDate", rm.DepartureDate);
                    myCommand.Parameters.AddWithValue("@RoomId", rm.RoomId);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");

        }

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



        //[HttpGet]
        //public IEnumerable<Room> Get()
        //{
        //    using (var context = new BossInfoProjectContext())
        //    {
        //        //get all rooms
        //        //return context.Rooms.ToList();

        //        //get room by id
        //        return context.Rooms.Where(Room => Room.RoomId == 1).ToList();

        //    }

        //}





    }
}
