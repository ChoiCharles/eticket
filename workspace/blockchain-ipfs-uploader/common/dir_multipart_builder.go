package common

import (
	"io"
	"mime/multipart"
	"net/textproto"
)

type DirMultipartBuilder struct {
	dirname string
	writer  *multipart.Writer
}

func (b *DirMultipartBuilder) Boundary() string {
	return b.writer.Boundary()
}

func (b *DirMultipartBuilder) Directory(dirname string) error {
	if _, err := b.writer.CreatePart(textproto.MIMEHeader{
		"Content-Disposition": {"form-data; name=\"file\"; filename=\"" + dirname + "\""},
		"Content-Type":        {"application/x-directory"},
	}); err != nil {
		return err
	}

	b.dirname = dirname
	return nil
}

func (b *DirMultipartBuilder) DirectoryName() string {
	return b.dirname
}

func (b *DirMultipartBuilder) AppendFile(filepath string, filecontent []byte) error {
	body, err := b.writer.CreatePart(textproto.MIMEHeader{
		"Abspath":             {filepath},
		"Content-Disposition": {"form-data; name=\"file\"; filename=\"" + filepath + "\""},
		"Content-Type":        {"application/octet-stream"},
	})
	if err != nil {
		return err
	}

	_, err = body.Write(filecontent)
	return err
}

func (b *DirMultipartBuilder) Close() error {
	return b.writer.Close()
}

func NewDirMultipartBuilder(buf io.Writer) DirMultipartBuilder {
	return DirMultipartBuilder{"", multipart.NewWriter(buf)}
}
