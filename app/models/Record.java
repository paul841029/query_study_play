package models;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Scanner;

import play.Play;
import play.db.ebean.Model;
import javassist.bytecode.ClassFileWriter.FieldWriter;

public class Record  extends Model{
	
	public String query_s1;
	public String query_s2;
	public int id;
	public int collection_index;
	
	public Record(){}
	
	public Record(String q1, String q2, int id, int collection_index) {
		this.query_s1 = q1;
		this.query_s2 = q2;
		this.id = id;
		this.collection_index = collection_index;
	}
	
	

	public static int getID() throws IOException {
		File read_file = Play.application().getFile("conf/id.txt");
		Scanner sc = new Scanner(read_file);
		int index = -1;
		while(sc.hasNextInt()){
			index = sc.nextInt();
		}
		sc.close();
		
		
		FileWriter write_file = new FileWriter(Play.application().getFile("conf/id.txt"),false);
		int nextId = index + 1;
		write_file.write(Integer.toString(nextId));
		write_file.flush();
		write_file.close();
		
		return index;
	}
	
	public void saveTofile() throws IOException {
		DateFormat dateFormate = new SimpleDateFormat("yyyy/MM/dd,HH:mm:ss");
		Date date = new Date();
		String str = dateFormate.format(date)+"	"+Integer.toString(this.id)+"	"+Integer.toString(this.collection_index)+"	q1:"+this.query_s1+"	q2:"+this.query_s2+"\n";
		FileWriter write_file = new FileWriter(Play.application().getFile("conf/record.txt"),true);
		write_file.write(str);
		write_file.flush();
		write_file.close();
		
	}
	

}
