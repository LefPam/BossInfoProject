using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using BossInfoProject.Models;

namespace BossInfoProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public RoomController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                         Select * from room order by roomId
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
        public JsonResult Post(roomtest rm)
        {
            string query = @"
                         INSERT INTO room (roomName) VALUES (@RoomName)
                        ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SqlConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@RoomName", rm.RoomName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");

        }

        [HttpPut]
        public JsonResult Put(roomtest rm)
        {
            string query = @"
                         Update room set roomname= @RoomName
                         where roomId=@RoomId
                        ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("SqlConn");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@RoomId", rm.RoomId);
                    myCommand.Parameters.AddWithValue("@RoomName", rm.RoomName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");

        }

        //Example With Entity Framework... Θα το δω λίγο πιο μετά για Best Practice(?).

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



