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
        public IEnumerable<Room> Get()
        {
            using (var context = new BossInfoProjectContext())
            {
                return context.Rooms.ToList().OrderBy(o => o.RoomId).ToList();
            }

        }

        [HttpPost]
        public JsonResult Post(roomtest rm)
        {
            using (var context = new BossInfoProjectContext())
            {
                var Room = new Room();
                Room.RoomName = rm.RoomName;
                context.Rooms.Add(Room);
                try
                {
                    context.SaveChanges();
                    return new JsonResult("Success");
                }
                catch (Exception ex)
                {
                    return new JsonResult("Failed");
                }

            }

        }

        //HttpGet-HttpPost-HttpPut with SqlClient Conectivity. (Bad Practice)
        //[HttpGet]
        //public JsonResult Get()
        //{
        //    string query = @"
        //                 Select roomid as RoomId, RoomName as RoomName from room order by roomId
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
        //public JsonResult Post(roomtest rm)
        //{
        //    string query = @"
        //                 INSERT INTO room (roomName) VALUES (@RoomName)
        //                ";

        //    DataTable table = new DataTable();
        //    string sqlDataSource = _configuration.GetConnectionString("SqlConn");
        //    SqlDataReader myReader;


        //    try
        //    {
        //        using (SqlConnection myCon = new SqlConnection(sqlDataSource))
        //    {

        //        myCon.Open();
        //        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        //        {
        //            myCommand.Parameters.AddWithValue("@RoomName", rm.RoomName);
        //            myReader = myCommand.ExecuteReader();
        //            table.Load(myReader);
        //            myReader.Close();
        //            myCon.Close();
        //        }
        //    }      
        //        return new JsonResult("Success");
        //    }
        //    catch (Exception ex)
        //    {
        //        return new JsonResult("Failed");
        //    }
        //}

    }

}



