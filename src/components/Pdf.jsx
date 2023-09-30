import PitukuLogo from "../assets/images/pituku_logo.webp";
import Ttd from "../assets/images/ttd.png";
import { rupiah } from "../utils/currency";

export default function pdfJSX(props) {
  return (
    <>
      <div
        style={{
          size: "29.7cm 21cm ",
          margin: "5mm 10mm 5mm 10mm",
        }}
      >
        <h1
          style={{
            fontSize: "18px",
            background: "#cadfb7",
            textAlign: "center",
            fontWeight: "bold",
            paddingBottom: 14,
          }}
        >
          FORM PENGAJUAN DANA
        </h1>
        <div
          style={{
            display: "flex",
            flex: "row",
            // background: "blue",
            marginTop: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: "row",
              // background: "red",
              width: "50%",
            }}
          >
            <div>
              <p>Tanggal Pengajuan</p>
              <p>No Pengajuan</p>
              <p>To Departemen</p>
              <p style={{ marginTop: "12px" }}>Department</p>
              <p>Dept. Head</p>
              <p>PIC</p>
              <p>CP</p>
              <p
                style={{
                  marginTop: "24px",
                }}
              >
                DETAIL PENGAJUAN
              </p>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <p>: {props.submissionDate}</p>
              <p>: {props.submissionNumber}</p>
              <p>: Finance</p>
              <p style={{ marginTop: "12px" }}>: {props.department}</p>
              <p>: {props.departmentHead}</p>
              <p>: {props.pic}</p>
              <p>: {props.cp}</p>
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
            }}
          >
            <img alt="" src={PitukuLogo} />
          </div>
        </div>

        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginTop: 16,
          }}
        >
          <thead>
            <tr
              style={{
                border: "1px solid #ddd",
                background: "#cadfb7",
              }}
            >
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "4px",
                  textAlign: "center",
                  paddingBottom: 14,
                }}
              >
                No
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "4px",
                  textAlign: "center",
                  paddingBottom: 14,
                }}
              >
                Detail
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "4px",
                  textAlign: "center",
                  paddingBottom: 14,
                }}
              >
                Harga
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "4px",
                  textAlign: "center",
                  paddingBottom: 14,
                }}
              >
                Jumlah
              </td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "4px",
                  textAlign: "center",
                  paddingBottom: 14,
                }}
              >
                Sub Total
              </td>
            </tr>
          </thead>
          <tbody>
            {props.items.map((item, index) => (
              <tr
                style={{
                  border: "1px solid #ddd",
                }}
                key={index}
              >
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "4px",
                    textAlign: "center",
                    paddingBottom: 14,
                  }}
                >
                  {index + 1}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "4px",
                    textAlign: "center",
                    paddingBottom: 14,
                  }}
                >
                  {item.title}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "4px",
                    textAlign: "center",
                    paddingBottom: 14,
                  }}
                >
                  {rupiah(item.price)}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "4px",
                    textAlign: "center",
                    paddingBottom: 14,
                  }}
                >
                  {item.quantity}
                </td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "4px",
                    textAlign: "center",
                    paddingBottom: 14,
                  }}
                >
                  {rupiah(item.subtotal)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            display: "flex",
            flex: "row",
            width: "60%",
            marginTop: "40px",
          }}
        >
          <div>
            <p>Terbilang</p>
            <p>Catatan</p>
            <p>Nama Bank</p>
            <p>Nomor Rekening</p>
            <p>Nama Rekening</p>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <p>: {props.totalInWords.toUpperCase()}</p>
            <p>: {props.notes}</p>
            <p>: {props.bank}</p>
            <p>: {props.bankAccountNumber}</p>
            <p>: {props.bankAccountName}</p>
          </div>
        </div>

        <table
          style={{
            width: "100%",
            marginTop: "30px",
          }}
        >
          <tr>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                textAlign: "center",
                paddingBottom: 14,
              }}
              colSpan={4}
            >
              Disetujui
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                textAlign: "center",
                paddingBottom: 14,
              }}
            >
              Dibuat oleh
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                textAlign: "center",
                paddingBottom: 14,
              }}
            >
              CEO
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                textAlign: "center",
                paddingBottom: 14,
              }}
            >
              CFO
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                textAlign: "center",
                paddingBottom: 14,
              }}
            >
              COO
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                textAlign: "center",
                paddingBottom: 14,
              }}
            >
              Division Head
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                textAlign: "center",
              }}
            ></td>
          </tr>
          <tr style={{ height: "100px" }}>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                verticalAlign: "bottom",
                paddingBottom: 14,

                textAlign: "center",
              }}
            >
              <img alt="" src={Ttd} style={{ width: '150px', marginLeft:'auto', marginRight: 'auto' }} />
              ( Faiz Fauzani R )
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                textAlign: "center",
                verticalAlign: "bottom",
                paddingBottom: 14,
              }}
            >
              <img alt="" src={Ttd} style={{ width: '150px', marginLeft:'auto', marginRight: 'auto' }} />
              ( Ibu Wulan )
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                textAlign: "center",
                verticalAlign: "bottom",
                paddingBottom: 14,
              }}
            >
              <img alt="" src={Ttd} style={{ width: '150px', marginLeft:'auto', marginRight: 'auto' }} />
              ( Bery Nur Arif )
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                textAlign: "center",
                verticalAlign: "bottom",
                paddingBottom: 14,
              }}
            >
              {props.departmentHead}
            </td>
            <td
              style={{
                border: "1px solid #ddd",
                padding: "4px",
                textAlign: "center",
                verticalAlign: "bottom",
                paddingBottom: 14,
              }}
            >
              {props.pic}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}
