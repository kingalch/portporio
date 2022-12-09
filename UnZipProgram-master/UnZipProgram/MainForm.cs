/*
 * Created by SharpDevelop.
 * User: asdf-2345
 * Date: 2020-03-22
 * Time: 오전 10:02
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;
using System.IO;
using System.IO.Compression;

namespace UnZipProgram
{
	/// <summary>
	/// Description of MainForm.
	/// </summary>
	public partial class MainForm : Form
	{
		string fileName;
		string point1;
		
		public MainForm()
		{
			InitializeComponent();
		}
		
		//파일지정
		void Button1Click(object sender, EventArgs e)
		{
			OpenFileDialog ofd = new OpenFileDialog();
			ofd.ShowDialog();
			fileName = ofd.FileName;
		}
		
		//위치지정
		void Button2Click(object sender, EventArgs e)
		{
			FolderBrowserDialog fbd = new FolderBrowserDialog();
			fbd.ShowDialog();
			point1 = fbd.SelectedPath;
		}
		
		//시작
		void Button3Click(object sender, EventArgs e)
		{
			string point2 = folderCreate();
			Console.WriteLine(point2);
			ZipFile.ExtractToDirectory(fileName, point2);
		}
		
		string folderCreate(){
			string folderName = point1 + "\\" + Path.GetFileNameWithoutExtension(fileName) + " 압축해제";
			DirectoryInfo d = new DirectoryInfo(folderName);
			
			d.Create();
			return folderName;
		}
	}
}
